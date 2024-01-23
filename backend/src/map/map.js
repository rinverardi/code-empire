/**
 * This is not a data structure that represents an map! Rather, it is a
 * container class for map-related things.
 */

export class Map {

    /**
     * Defines the map templates.
     */

    static get Template() {
        return Object.freeze({
            0: [
                "w m m w m m w w w w w ",
                " m f h h g h w m h w w",
                "w f g h g g h m g g w ",
                " w g g m g g h g g g w",
                "w g g h m g g g g h w ",
                " w g g h m g g g g m w",
                "w h g g h g g f f g m ",
                " m g g g g g g f g g m",
                "m g f f g g g g g g m ",
                " m g f g g h g g g h w",
                "w h g g g m h g g g w ",
                " w g g g g m h g g f w",
                "w h g g g g m g g f w ",
                " m g g g w g h g g h w",
                "w h f f w w g g h h m ",
                " w w w w w w w w m m w"
            ],
            1: [
                "w w w w w m m w w w w ",
                " w f g h w h h g f f w",
                "w f g g m w g g g f w ",
                " w g g g m w g g g g w",
                "w g g g g h w g g g w ",
                " w g g g g w g g g w w",
                "w h g g w w h g g h w ",
                " m g g w m m h g g m w",
                "w h g g w w h g g h m ",
                " w g g g g w g g f w w",
                "w g g f g g w g f f w ",
                " w g f f g g g g g g w",
                "w f g g g g w g g g w ",
                " w f g g g w f h g g w",
                "w w h g h w w f h h w ",
                " w w m m w w w w m w w"
            ],

            2: [
                "w w w w w m m m w w w ",
                " m h f f h g g h f f w",
                "m g g f g g g g g f w ",
                " m g g g g g g g g h w",
                "w h g g g f f g g g m ",
                " w f g g f m f g g g m",
                "w f f g h m m f g g m ",
                " m h g g h w m h g h w",
                "m h g g g w w h g g w ",
                " m h g g g w g g g f w",
                "w h g f g g g g g f w ",
                " w g f f g g f g g w w",
                "w h g g g g f f g g w ",
                " m g g w g g g g g f w",
                "w m h w h g g h g f w ",
                " w w w w m m m w w w w"
            ]
        });
    }

    /**
     * Defines the map tiles.
     */

    static get Tile() {
        return Object.freeze({
            forest: 'f',
            grass: 'g',
            hill: 'h',
            mountain: 'm',
            water: 'w'
        })
    }
};
