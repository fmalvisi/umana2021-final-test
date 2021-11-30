import { from } from "rxjs";
import { CustomPipeEta } from "./etapipe.pipe";
import { User, UsersService} from "src/app/core/api/generated";
import { TestBed } from "@angular/core/testing";

    
    let agemonth, oggiData, date, ageyear;
    ageyear=5;

        describe('pipe funziona', () => {
        
            it('should create', () => {
                const pipe=new CustomPipeEta();
                expect(pipe).toBeTruthy();
            });

            fit('sholud  age--', ()=>{
                const pipe = new CustomPipeEta();
                let service=TestBed.compileComponents
                let month=-1;
                let ageyear=4;
                expect(pipe.transform).toEqual(ageyear--);

            })




        })

