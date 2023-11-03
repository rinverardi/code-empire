export class Map {
    static get Template() {
        return Object.freeze({

            // TODO Design me!

            0: [
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