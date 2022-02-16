import { MappingPair } from "@dynamic-mapper/mapper";
import { AutoMappableProperties, ExplicitProperties } from "@dynamic-mapper/mapper/lib/interface";

export class Profile {
    private matchMap = {};

    createMap<TSource, TDestination>(
        tSource: new () => TSource,
        tDestination: new () => TDestination,
        members: Partial<AutoMappableProperties<TSource, TDestination>> &
            Required<ExplicitProperties<TSource, TDestination>> = null
    ) {
        this.matchMap[`${tSource.name}${tDestination.name}`] = {
            mappingPair: new MappingPair<TSource, TDestination>(),
            function: members
        };
    }

    getMatchMap() {
        return this.matchMap;
    }
}
