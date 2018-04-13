import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  ActivityRepositoryToken,
  ParticipationRepositoryToken,
  VoteRepositoryToken,
} from '../constants';
import { IActivity, IIdea } from '../../../common/interface';
import {
  CreateActivityDto,
  CreateIdeaDto,
  EditActivityDto,
} from '../../../common/dto';
import { Activity } from './activity.entity';
import { Participation } from './participation.entity';
import { Vote } from './vote.entity';

@Component()
export class ActivityService {
  constructor(
    @Inject(ActivityRepositoryToken)
    private readonly activityRepository: Repository<Activity>,
    @Inject(ParticipationRepositoryToken)
    private readonly participationRepository: Repository<Participation>,
    @Inject(VoteRepositoryToken)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async getAll(): Promise<IIdea[]> {
    return await this.activityRepository.find();
  }

  async getAllIdeas(): Promise<IIdea[]> {
    return await this.activityRepository.find({ planned: false });
  }

  async getAllActivites(): Promise<IActivity[]> {
    const activities: Activity[] = await this.activityRepository.find({
      planned: false,
    });

    return await Promise.all(
      activities.map(async (activity): Promise<IActivity> => {
        const participations: Participation[] = await activity.participations;
        return Object.assign({ participants: participations.length }, activity);
      }),
    );
  }

  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<IActivity> {
    const activity: Activity = this.activityRepository.create(
      createActivityDto,
    );
    await this.activityRepository.save(activity);
    return Object.assign({ participants: 0 }, activity);
  }

  async createIdea(createIdeaDto: CreateIdeaDto): Promise<IIdea> {
    const activity: Activity = this.activityRepository.create(createIdeaDto);
    if (!createIdeaDto.posterUrl) {
      activity.posterUrl =
        'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png';
    }
    return await this.activityRepository.save(activity);
  }

  async delete(activityOpt: number | Activity): Promise<void> {
    const activityId: number =
      typeof activityOpt === 'number' ? activityOpt : activityOpt.id;
    return await this.activityRepository.deleteById(activityId);
  }

  async edit(editActivityDto: EditActivityDto): Promise<void> {
    return await this.activityRepository.updateById(
      editActivityDto.id,
      editActivityDto,
    );
  }

  async signal(
    activityOpt: number | Activity,
    signaled: boolean = true,
  ): Promise<void> {
    const activityId: number =
      typeof activityOpt === 'number' ? activityOpt : activityOpt.id;
    return await this.activityRepository.updateById(activityId, { signaled });
  }

  async participate(
    userId: number,
    activityOpt: number | Activity,
    participate: boolean = true,
  ): Promise<void> {
    const activityId: number =
      typeof activityOpt === 'number' ? activityOpt : activityOpt.id;
    const activity: Activity = await this.activityRepository.findOneById(
      activityId,
      {
        relations: ['participations'],
      },
    );
    const alreadyParticipate: boolean = activity.participations.find(
      p => p.userId === userId,
    )
      ? true
      : false;

    if (!alreadyParticipate && participate) {
      const participation: Participation = this.participationRepository.create({
        userId,
      });
      activity.participations.push(participation);
    }

    if (alreadyParticipate && !participate) {
      const i: number = activity.participations.findIndex(
        p => p.userId === userId,
      );
      activity.participations.splice(i, 1);
    }

    await this.activityRepository.save(activity);
  }

  async getUsers(activityOpt: number | Activity): Promise<number[]> {
    const activityId: number =
      typeof activityOpt === 'number' ? activityOpt : activityOpt.id;
    const activity: Activity = await this.activityRepository.findOneById(
      activityId,
      {
        relations: ['participations'],
      },
    );

    return activity.participations.map(p => p.userId);
  }

  async vote(
    userId: number,
    activityOpt: number | Activity,
    voted: boolean,
  ): Promise<void> {
    const activity: Activity =
      typeof activityOpt === 'number'
        ? await this.activityRepository.findOneById(activityOpt)
        : activityOpt;
    let vote: Vote = await this.voteRepository.findOne({
      userId,
      activity,
    });
    const alreadyVote: boolean = vote ? true : false;

    if (voted && !alreadyVote) {
      vote = this.voteRepository.create({ userId, activity });
      await this.voteRepository.save(vote);
    }

    if (!voted && alreadyVote) {
      await this.voteRepository.delete({ activity, userId });
    }
  }
}
