export class PlayerMapper {
    mapForAnyone(source) {
        return {
            id: source.id,
            name: source.name,
            role: source.role
        };
    }
};