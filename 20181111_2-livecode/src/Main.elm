module Main exposing (main)

import Browser
import Browser.Dom
import Browser.Events
import Color as Color
import Html exposing (Html)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Json
import Task
import Tuple
import TypedSvg as Svg exposing (circle, g, rect)
import TypedSvg.Attributes exposing (fill, stroke, style, transform, viewBox)
import TypedSvg.Attributes.InPx as A exposing (cx, cy, height, r, width)
import TypedSvg.Core exposing (Svg)
import TypedSvg.Types exposing (Fill(..), Transform(..))


type Msg
    = UpdateTime Float
    | WindowResize Int Int
    | MouseMoved Float Float


type alias Model =
    { time : Float
    , size : ( Float, Float )
    , mouse : ( Float, Float )
    }


getX =
    Tuple.first


getY =
    Tuple.second


getW =
    Tuple.first


getH =
    Tuple.second


view : Model -> Html Msg
view model =
    Svg.svg
        [ width (getW model.size)
        , height (getH model.size)
        , viewBox 0 0 (getW model.size) (getH model.size)
        ]
        [ rect
            [ fill (Fill Color.black)
            , A.x 0
            , A.y 0
            , height (getH model.size)
            , width (getW model.size)
            ]
            []
        , rects model "" "" ""
        ]


rects model mat1 mat2 mat3 =
    List.range 0 (getW model.size / 10 |> floor)
        |> List.map (\x -> List.range 0 (getH model.size / 10 |> floor) |> List.map (\y -> ( x, y )))
        |> List.concat
        |> List.map (\( x, y ) -> ( toFloat x, toFloat y ))
        |> List.map
            (\( xx, yy ) ->
                rect
                    [ fill
                        (Fill
                            (if remainderBy 10 (floor (yy + xx + 10 * sin model.time)) == 0 then
                                Color.darkPurple

                             else
                                Color.darkGreen
                            )
                        )
                    , A.x (xx * 10)
                    , A.y (yy * 10)
                    , width 10
                    , height 10
                    ]
                    []
            )
        |> Svg.g []


fmod : Float -> Float -> Float
fmod modulus x =
    x - modulus * toFloat (floor (x / modulus))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateTime time ->
            ( { model | time = model.time + time }
            , Cmd.none
            )

        WindowResize x y ->
            ( { model | size = ( toFloat x, toFloat y ) }, Cmd.none )

        MouseMoved x y ->
            ( { model | mouse = ( x, y ) }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta UpdateTime
        , Browser.Events.onResize WindowResize
        , Browser.Events.onMouseMove mouseMoved
        ]


mouseMoved : Decoder Msg
mouseMoved =
    Decode.map2
        MouseMoved
        (Decode.field "x" Decode.float)
        (Decode.field "y" Decode.float)


init : flags -> ( Model, Cmd Msg )
init _ =
    ( { time = 0.0
      , size = ( 0, 0 )
      , mouse = ( 0, 0 )
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
