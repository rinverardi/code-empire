/**
 * This is not a data structure that represents an map! Rather, it is a
 * container class for map-related things.
 */

export class Map {

    /**
     * The map templates that are supported.
     */

    static get Template() {
        return Object.freeze({

            // TODO Design me!

            0: [
                'w w w w w w w w ',
                ' w g g w w f f w',
                'w g h g g m f w ',
                ' w g m g h h g w',
                'w g f m g g g w ',
                ' w g f h g g w w',
                'w g g g g g f w ',
                ' w g g g g f f w',
                'w g g h m g g w ',
                ' w f g h m g h w',
                'w f f w h g h w ',
                ' w w w w w w w w'
            ],

            // TODO Design me!

            1: [
                'w w w w w w w w ',
                ' w g g g f f w w',
                'w g h g g f h w ',
                ' w g m g g g h w',
                'w g f m g g g w ',
                ' w g f h g g w w',
                'w g g h g g g w ',
                ' w g g m g g f w',
                'w g g h m g f w ',
                ' w f g h g g h w',
                'w f f w h g h w ',
                ' w w w w w w w w'
            ],

            // TODO Design me!

            2: [
                'w w w w w w w w ',
                ' w g g g f f w w',
                'w g h g g f h w ',
                ' w g m g g g h w',
                'w g f m g g g w ',
                ' w g f h g g w w',
                'w g g h g g g w ',
                ' w g g m g g f w',
                'w g g h m g f w ',
                ' w f g h g g h w',
                'w f f w h g h w ',
                ' w w w w w w w w'
            ]
        });
    }

    /**
     * The map tiels that are supported.
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
