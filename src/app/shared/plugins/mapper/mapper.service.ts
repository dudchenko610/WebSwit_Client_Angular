import { Inject, Injectable, Type } from "@angular/core";
import { Mapper, MAPPING_PROFILE } from "@dynamic-mapper/angular";
import { MapperConfiguration } from "@dynamic-mapper/mapper";
import { Profile } from "./mapper.profile";

@Injectable()
export class MapperService {
    private readonly mapper: Mapper;

    private totalMatchMap;

    constructor(@Inject(MAPPING_PROFILE) profiles: Profile[]) {
        this.totalMatchMap = {};

        const configuration = new MapperConfiguration((cfg) => {
            profiles.map((profile) => {
                Object.entries(profile.getMatchMap()).forEach(
                    ([key, value]) => {
                        const mappingPair = (<any>value).mappingPair;
                        const func = (<any>value).function;
                        cfg.createAutoMap(mappingPair, func ?? {});

                        this.totalMatchMap[key] = mappingPair;
                    }
                );
            });
        });

        this.mapper = configuration.createMapper();
    }

    map<TSource, TDestination>(
        tSource: new () => TSource,
        tDestination: new () => TDestination,
        source: TSource
    ): TDestination {
        return this.mapper.map(
            this.totalMatchMap[`${tSource.name}${tDestination.name}`],
            source
        );
    }
}
