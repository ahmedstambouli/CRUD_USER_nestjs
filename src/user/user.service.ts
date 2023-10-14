import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private users:any[]=[];

    
  create(createUserDto: CreateUserDto) {

    const user = new User();
    user.id=this.generateUserId();
    user.name=createUserDto.name;
    user.age=createUserDto.age;
    this.users.push(user);
    return this.users;  
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    return user; 
  }

  update(id: number, updateUserDto: UpdateUserDto) { 
    const index=this.users.findIndex((u)=>{return  u.id===id});
    this.users[index]={...this.users[index],...UpdateUserDto};
    return this.users[index];
  }

  remove(id: number) {
    const index=this.users.findIndex((u)=>{return  u.id==id});
    const removuser=this.users.splice(index,1)[0];
    return this.users;
   
  }

  
   generateUserId(): number {
    const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  }
}
