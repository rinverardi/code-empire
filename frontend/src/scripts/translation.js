export class Translation {
    mapName(mapId) {
        switch (mapId) {
            case 0:
                return 'Meaty Meadows';

            case 1:
                return 'Nebulous Nirvana';

            case 2:
                return 'Pristine Peaks';

            default:
                throw new RangeError('No such map');
        };
    }
};