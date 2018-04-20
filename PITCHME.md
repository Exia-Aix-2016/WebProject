# WebProject: a BDE WebSite

By Mandel VAUBOURG, Hugo RENARD, Baptiste FISCHINI.

---

# Summary:

1. Presentation of the project
2. Presentation of the solution
3. Demonstration
4. Conclusion

---
# Presentation of the project

* A website for the CESI-EXIA's BDE
* Activities gestion
* Creation of ideas
* Users rights
* Gestion of a cart
* Social page

---
# Presentation of the solution

---
# The Database

![bdd](https://user-images.githubusercontent.com/7594435/38731510-cbda2802-3f1a-11e8-8559-7d7b55edae17.png)

---


# Technologies

* NestJs
* AngularJs
* TypeORM
* PassportJs
* JsonWebToken

---
# NestJS

* Modular architecture
* All kinds of server-side applications
* Build in TypeScript

+++

## Route system

@[fragment-range]
@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly socialService: SocialService,
  ) { }

  @Get()
  async getAll(): Promise<IActivity[]> {
    return await this.activityService.getAllActivites();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createActivityDto: CreateActivityDto,): Promise<IActivity> {
    
    return await this.activityService.createActivity(createActivityDto);
  }

  @Get('occurrences')
  async getOccurrences(): Promise<string[]> {
    const occurrences: Occurrence[] = await this.activityService.getOccurrences();
    return occurrences.map(occurrence => occurrence.name);
  }


---
# AngularJS

* Build apps for any deployment target
* Achieve the maximum speed possible on the Web Platform 
* Extend the template language with our own components 

---
# TypeORM

+++

## Model

---
# PassportJs

---
# JsonWebToken

---
# Conclusion 