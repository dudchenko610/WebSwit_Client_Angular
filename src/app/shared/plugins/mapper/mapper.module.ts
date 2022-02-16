import { ModuleWithProviders, NgModule, Type } from "@angular/core";
import { MAPPING_PROFILE } from "@dynamic-mapper/angular";
import { Profile } from "./mapper.profile";
import { MapperService } from "./mapper.service";

export function createProfileProvider(profile) {
    return { provide: MAPPING_PROFILE, useClass: profile, multi: true };
}

@NgModule({
    providers: [MapperService]
})
export class MapperModule {
    static withProfiles(profiles: Type<Profile>[]): ModuleWithProviders<MapperModule> {
        return {
            ngModule: MapperModule,
            providers: profiles.map(createProfileProvider)
        };
    }
}
