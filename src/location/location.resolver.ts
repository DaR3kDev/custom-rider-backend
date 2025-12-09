import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Department } from '~/location/entities/department.entity';
import { Municipality } from '~/location/entities/municipality.entity';

@Resolver()
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => [Department], { name: 'departments' })
  getAllDepartments() {
    return this.locationService.getDepartments();
  }

  @Query(() => [Municipality], { name: 'municipalities' })
  getMunicipalitiesByDepartment(@Args('departmentId', { type: () => Int }) id: number) {
    return this.locationService.getMunicipalitiesByDepartment(id);
  }
}
