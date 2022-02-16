import { InjectionToken } from "@angular/core";
import { Profile } from "./mapper.profile";

export const MAPPING_PROFILE = new InjectionToken<Profile>('MappingProfile');