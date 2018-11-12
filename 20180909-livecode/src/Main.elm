module Main exposing (main)

import Browser
import Browser.Dom
import Browser.Events
import Html exposing (Html)
import Html.Attributes exposing (height, width)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Json
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Math.Vector4 as Vec4 exposing (Vec4, vec4)
import Task
import WebGL exposing (Mesh, Shader)
import WebGL.Settings


type Msg
    = UpdateTime Float
    | WindowResize Int Int
    | MouseMoved Vec2
    | KeyUp String
    | KeyDown String


type alias Model =
    { time : Float
    , size : Vec2
    , mouse : Vec2
    , extra : Float
    }


view : Model -> Html Msg
view model =
    WebGL.toHtmlWith
        [ WebGL.alpha True
        , WebGL.antialias
        , WebGL.clearColor 0.0 0.0 0.0 1.0
        ]
        [ model.size |> Vec2.getX |> floor |> width
        , model.size |> Vec2.getY |> floor |> height
        ]
        [ WebGL.entityWith
            [ WebGL.Settings.sampleAlphaToCoverage ]
            vertexShader
            fragmentShader
            (meshes model)
            { size = model.size
            , perspective = perspective model.size
            , time = model.time
            , mouse = model.mouse
            }
        ]


type alias Attributes =
    { point : Vec2 }


meshes : Model -> Mesh Attributes
meshes model =
    let
        a =
            --12543 + 100 * sin model.time
            model.time / 500
    in
    List.range 1 2000
        |> List.map toFloat
        |> List.map (\m -> ( sqrt (m / a), a * m ))
        |> List.map fromPolar
        |> List.map (\( x, y ) -> { point = vec2 x y })
        |> List.repeat 5
        |> List.concat
        {--
        |> List.map
            (\p ->
                let
                    newpoint =
                        Mat4.makeRotate ( vec3 (sin (model.time / 1000.0)) (sin (model.time / 1000.0)), 1.0 )
                            |> Mat4.transform (vec3 (Vec2.getX p.point) (Vec2.getY p.point) 1.0)
                in
                { point = newpoint }
            )
        --}
        |> WebGL.lineStrip


perspective : Vec2 -> Mat4
perspective size =
    Mat4.makeOrtho2D
        (-1.0 * Vec2.getX size / Vec2.getY size)
        (1.0 * Vec2.getX size / Vec2.getY size)
        -1.0
        1.0


type alias Uniforms =
    { size : Vec2
    , mouse : Vec2
    , time : Float
    , perspective : Mat4
    }


type alias Varyings =
    {}


vertexShader : Shader Attributes Uniforms Varyings
vertexShader =
    [glsl|
        precision mediump float;
        attribute vec2 point;
        uniform mat4 perspective;
        uniform vec2 mouse;
        uniform float time;

        void main () {
            gl_PointSize = 100.0;
            vec4 pos = vec4(point, 0.0, 1.0);
            gl_Position = perspective * pos;
        }
    |]


fragmentShader : Shader {} Uniforms Varyings
fragmentShader =
    [glsl|
        precision mediump float;
        uniform float time;

        float circle(in vec2 st, in float radius) {
            vec2 dist = st - vec2(0.5);
            return 1.0 - smoothstep(radius - (radius * 0.01), radius + (radius * 0.01), dot(dist, dist) * 4.0);
        }

        vec3 hsb2rgb( in vec3 c ) {
            vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
            rgb = rgb*rgb*(3.0-2.0*rgb);
            return c.z * mix(vec3(1.0), rgb, c.y);
        }

        float fmod( in float x, in float modulus) {
            return x - modulus * (floor(x / modulus));
        }

        void main() {
            gl_FragColor = vec4(hsb2rgb(vec3(fmod(time / 1000.0, 1.0), 1.0, 1.0)), 1.0);
        }
    |]


fmod : Float -> Float -> Float
fmod modulus x =
    x - modulus * toFloat (floor (x / modulus))


mouseToWebGL : Vec2 -> Vec2 -> Vec2
mouseToWebGL size mouse =
    let
        result =
            Mat4.transform
                (Maybe.withDefault
                    Mat4.identity
                    (Mat4.inverse (perspective size))
                )
                (vec3
                    (Vec2.getX mouse / Vec2.getX size * 2 - 1)
                    -(Vec2.getY mouse / Vec2.getY size * 2 - 1)
                    1
                )
    in
    vec2 (Vec3.getX result) (Vec3.getY result)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateTime time ->
            -- Update logic
            ( { model | time = model.time + time }, Cmd.none )

        WindowResize x y ->
            ( { model | size = vec2 (toFloat x) (toFloat y) }, Cmd.none )

        MouseMoved point ->
            ( { model | mouse = point }, Cmd.none )

        KeyDown key ->
            case key of
                _ ->
                    let
                        a =
                            Debug.log "time" model.extra
                    in
                    ( { model | extra = model.extra + 0.1 }, Cmd.none )

        KeyUp key ->
            case key of
                _ ->
                    ( model, Cmd.none )


keyDecoder : Decode.Decoder String
keyDecoder =
    Decode.field "key" Decode.string


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta UpdateTime
        , Browser.Events.onResize WindowResize
        , Browser.Events.onMouseMove mouseMoved
        , Browser.Events.onKeyUp (Decode.map KeyUp keyDecoder)
        , Browser.Events.onKeyDown (Decode.map KeyDown keyDecoder)
        ]


mouseMoved : Decoder Msg
mouseMoved =
    Decode.map MouseMoved
        (Decode.map2
            vec2
            (Decode.field "x" Decode.float)
            (Decode.field "y" Decode.float)
        )


init : flags -> ( Model, Cmd Msg )
init _ =
    ( { time = 0.0
      , size = vec2 0 0
      , mouse = vec2 0 0
      , extra = 0
      }
    , Task.perform (\v -> WindowResize (floor v.viewport.width) (floor v.viewport.height)) Browser.Dom.getViewport
    )


main : Program Json.Value Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
