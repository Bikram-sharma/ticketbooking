

export function ticketIdgenerater(length = 10) {
  
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketId = '';

    for(let i=0; i < length; i++){
        const randonIndex = Math.floor(Math.random() * characters.length);
         ticketId += characters[randonIndex];
    }

    return ticketId
}
