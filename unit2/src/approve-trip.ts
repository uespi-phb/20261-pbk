export type TripRequestStatus = 'pending' | 'approved' | 'rejected'

export class TripRequest {
  constructor(
    public readonly id: string,
    public readonly requesterEmail: string,
    private currentStatus: TripRequestStatus
  ) {}

  approve(): void {
    if (this.currentStatus !== 'pending') {
      throw new Error('Trip request is not pending')
    }

    this.currentStatus = 'approved'
  }

  get status(): TripRequestStatus {
    return this.currentStatus
  }
}

export interface LoadTripRequestByIdRepository {
  loadById(input: LoadTripRequestByIdRepository.Input): Promise<LoadTripRequestByIdRepository.Output>
}

export namespace LoadTripRequestByIdRepository {
  export type Input = {
    requestId: string
  }

  export type Output = TripRequest | null
}

export interface SaveTripRequestRepository {
  save(tripRequest: TripRequest): Promise<void>
}

export interface NotificationGateway {
  send(input: NotificationGateway.Input): Promise<void>
}

export namespace NotificationGateway {
  export type Input = {
    to: string
    subject: string
    body: string
  }
}

export class ApproveTripRequest {
  constructor(
    private readonly loadTripRequestByIdRepository: LoadTripRequestByIdRepository,
    private readonly saveTripRequestRepository: SaveTripRequestRepository,
    private readonly notificationGateway: NotificationGateway
  ) {}

  async execute(input: ApproveTripRequest.Input): Promise<void> {
    const tripRequest = await this.loadTripRequestByIdRepository.loadById({
      requestId: input.requestId
    })

    if (tripRequest === null) {
      throw new Error('Trip request not found')
    }

    tripRequest.approve()

    await this.saveTripRequestRepository.save(tripRequest)

    await this.notificationGateway.send({
      to: tripRequest.requesterEmail,
      subject: 'Trip request approved',
      body: `Your trip request ${tripRequest.id} was approved`
    })
  }
}

export namespace ApproveTripRequest {
  export type Input = {
    requestId: string
  }
}

