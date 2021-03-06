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


meshes model =
    List.range 0 150
        |> List.map toFloat
        |> List.map (\n -> listPoints { model | time = model.time - (n * 5) } n)
        |> List.concat
        |> WebGL.lineStrip


listPoints model n =
    List.range -150 150
        |> List.map toFloat
        |> List.map (\n2 -> func model (n2 / 100))
        |> List.map (\( x, y ) -> { point = vec2 x y })


func model n =
    let
        k =
            abs (cos (model.time / 1000)) * sin (3 * model.time / 1000)

        b =
            cos (3 * model.time / 1000)

        x =
            n + (k * n) / sqrt (b ^ 2 + n ^ 2)

        y =
            b + (b * k) / sqrt (b ^ 2 + n ^ 2)
    in
    ( x, y )


perspective : Vec2 -> Mat4
perspective size =
    Mat4.makeOrtho2D
        (-1.0 * Vec2.getX size / Vec2.getY size)
        (1.0 * Vec2.getX size / Vec2.getY size)
        -1.0
        1.0


clamp : Float -> Float -> Float -> Float
clamp x min max =
    if x < min then
        min

    else if x > max then
        max

    else
        x


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
        attribute vec2 point;
        uniform mat4 perspective;

        void main () {
            gl_PointSize = 50.0;
            vec4 pos = vec4(point, 0.0, 1.0);
            gl_Position = perspective * pos;
        }
    |]


fragmentShader : Shader {} Uniforms Varyings
fragmentShader =
    [glsl|
        precision mediump float;
        uniform float time;
        uniform vec2 size;

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

        float rand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
            vec2 st = gl_FragCoord.xy / size;
            //st /= sin(time);
            gl_FragColor = vec4(st.x * abs(cos(time)), st.y * abs(sin(time)), st.y, 1.0);
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
                    ( model, Cmd.none )

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
