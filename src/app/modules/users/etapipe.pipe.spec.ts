import { from } from "rxjs";
import { CustomPipeEta } from "./etapipe.pipe";
import { User, UsersService} from 'src/app/core/api/generated';





    class MockUser {
        user = {
        "id": 2,
            "name": "Paolo",
            "surname": "Bianchi",
            "email": "paolo.bianchi@email.com",
            "dob": "'02-01-1970"
        }
    }

        describe('pipe funziona', () => {
        
            it('should create', () => {
                const pipe=new CustomPipeEta();
                expect(pipe).toBeTruthy();
            });

            it('sholud transform 51 anni', ()=>{
                const pipe = new CustomPipeEta();
                //let res=pipe.transform(MockUser);
               // expect(res).toEqual("51 anni");
            })




        })

