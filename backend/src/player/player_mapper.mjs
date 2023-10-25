export class PlayerMapper {
    map(sessionContext, source) {
        return {
            id: source.id,
            name: source.name,
            role: source.role
        };
    }
};