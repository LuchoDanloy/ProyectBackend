import container from "../../container.js";


class TicketManager
{
  constructor()
  {
     this.ticketRepository = container.resolve('TicketRepository');
  }

  async paginate(criteria)
  {
    return this.ticketRepository.paginate(criteria);
  }

  async create(data)
  {
    const ticket = await this.ticketRepository.create(data);

    return ticket;
  }

}

export default TicketManager;
