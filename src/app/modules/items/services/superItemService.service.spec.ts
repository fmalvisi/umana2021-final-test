import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { SuperItemService } from "./superItemService.service";

describe('superItemService', () => {
    let service : SuperItemService;
    let httpMock : HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(SuperItemService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should getItemList', waitForAsync(() => {
        expect(service).toBeTruthy();
        const objects = [
            {
                "id": 1,
                "name": "Yankee Candle",
                "description": "Usata",
                "price": 15.5,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 3,
                "owner": 4
            },
            {
                "id": 2,
                "name": "Palla",
                "description": "Usata",
                "price": 25,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 1,
                "owner": 2
            }            
        ];

    service.getItemList().then((oggettiAttuali) => {
        expect(oggettiAttuali).toEqual(objects);
    });

    const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items')
    expect(req.request.method).toEqual('GET');
    req.flush(objects);

    httpMock.verify();

    }));

    it('should getItemById', waitForAsync(() => {
        const objects = [
            {
                "id": 1,
                "name": "Yankee Candle",
                "description": "Usata",
                "price": 15.5,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 3,
                "owner": 4
            },
            {
                "id": 2,
                "name": "Palla",
                "description": "Usata",
                "price": 25,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 1,
                "owner": 2
            }            
        ];

        service.getItemById(1).then((oggettoAttuale) => {
            expect(oggettoAttuale).toEqual(objects[0]);
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items/1');
        expect(req.request.method).toEqual('GET');
        req.flush(objects[0]);

        httpMock.verify();

    }));



    it('should NOT getItemById', waitForAsync(() => {
        
        expect(service).toBeTruthy();

        const mockErrorResponse = {status: 400, statusText: 'Bad Request'};

        service.getItemById(1).then((oggettoAttuale) => {
            fail('should not get here but did with items: ')
        }, (error) => {
            expect(error).toBeTruthy();
            expect(error.statusText).toEqual('Bad Request');
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items/1');
        expect(req.request.method).toEqual('GET');
        req.flush({}, mockErrorResponse);

        httpMock.verify();

    }));


    it('should createItem', waitForAsync (() => {
        const objects = [
            {
                "id": 1,
                "name": "Yankee Candle",
                "description": "Usata",
                "price": 15.5,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 3,
                "owner": 4
            },
            {
                "id": 2,
                "name": "Palla",
                "description": "Usata",
                "price": 25,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 1,
                "owner": 2
            }            
        ];

        service.createItem(objects[0]).subscribe((res) => {
            expect(res).toBeTruthy();
        })

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items');
        expect(req.request.method).toEqual('POST');
        req.flush({id: 1});

        httpMock.verify();
    }));


    it('should NOT createItem', waitForAsync (() => {
        const objects = [
            {
                "id": 1,
                "name": "Yankee Candle",
                "description": "Usata",
                "price": 15.5,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 3,
                "owner": 4
            },
            {
                "id": 2,
                "name": "Palla",
                "description": "Usata",
                "price": 25,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 1,
                "owner": 2
            }            
        ];

        const mockErrorResponse = {status: 400, statusText: 'Bad Request'};

        service.createItem(objects[0]).subscribe((res) => {
            fail('Should not have completed')
        },(error) => {
            expect(error).toBeTruthy();
            expect(error.statusText).toEqual('Bad Request');
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items');
        expect(req.request.method).toEqual('POST');
        req.flush({}, mockErrorResponse);

        httpMock.verify();
    }));


    it('should updateItem', waitForAsync (() => {
        const objects = [
            {
                "id": 1,
                "name": "Yankee Candle",
                "description": "Usata",
                "price": 15.5,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 3,
                "owner": 4
            },
            {
                "id": 2,
                "name": "Palla",
                "description": "Usata",
                "price": 25,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 1,
                "owner": 2
            }            
        ];

        service.updateItem(objects[0]).subscribe((res) => {
            expect(res).toBeTruthy();
        })

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items/1');
        expect(req.request.method).toEqual('PUT');
        req.flush(objects[0]);

        httpMock.verify();
    }));


    it('should NOT updateItem', waitForAsync (() => {
        const objects = [
            {
                "id": 1,
                "name": "Yankee Candle",
                "description": "Usata",
                "price": 15.5,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 3,
                "owner": 4
            },
            {
                "id": 2,
                "name": "Palla",
                "description": "Usata",
                "price": 25,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 1,
                "owner": 2
            }            
        ];

        const mockErrorResponse = {status: 400, statusText: 'Bad Request'};

        service.updateItem(objects[0]).subscribe((res) => {
            fail('Should not have completed')
        },(error) => {
            expect(error).toBeTruthy();
            expect(error.statusText).toEqual('Bad Request');
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items/1');
        expect(req.request.method).toEqual('PUT');
        req.flush({}, mockErrorResponse);

        httpMock.verify();
    }));


    it('should deleteItem', waitForAsync (() => {
        const objects = [
            {
                "id": 1,
                "name": "Yankee Candle",
                "description": "Usata",
                "price": 15.5,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 3,
                "owner": 4
            },
            {
                "id": 2,
                "name": "Palla",
                "description": "Usata",
                "price": 25,
                "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
                "category": 1,
                "owner": 2
            }            
        ];

        service.deleteItem(1).subscribe((res) => {
            expect(res).toBeTruthy();
        })

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items/1');
        expect(req.request.method).toEqual('DELETE');
        req.flush(objects[0]);

        httpMock.verify();
    }));


    it('should NOT deleteItem', waitForAsync (() => {
        expect(service).toBeTruthy();

        const mockErrorResponse = {status: 400, statusText: 'Bad Request'};

        service.deleteItem(1).subscribe((res) => {
            fail('Should not have completed')
        },(error) => {
            expect(error).toBeTruthy();
            expect(error.statusText).toEqual('Bad Request');
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/items/1');
        expect(req.request.method).toEqual('DELETE');
        req.flush({}, mockErrorResponse);

        httpMock.verify();
    }));


    it('should getUserList', waitForAsync(() => {
        expect(service).toBeTruthy();
        const users = [
            {
              "id": 1,
              "name": "Mario",
              "surname": "Rossi",
              "email": "mario.rossi@email.com",
              "dob": "01-01-1970"
            },
            {
              "id": 2,
              "name": "Paolo",
              "surname": "Bianchi",
              "email": "paolo.bianchi@email.com",
              "dob": "02-01-1970"
            }
        ];

        service.getUserList().then((utentiAttuali) => {
            expect(utentiAttuali).toEqual(users);
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/users');
        expect(req.request.method).toEqual('GET');
        req.flush(users);

        httpMock.verify();

    }));


    it('should getUserById', waitForAsync(() => {
        const users = [
            {
              "id": 1,
              "name": "Mario",
              "surname": "Rossi",
              "email": "mario.rossi@email.com",
              "dob": "01-01-1970"
            },
            {
              "id": 2,
              "name": "Paolo",
              "surname": "Bianchi",
              "email": "paolo.bianchi@email.com",
              "dob": "02-01-1970"
            }
        ];

        service.getUserById(1).then((utenteAttuale) => {
            expect(utenteAttuale).toEqual(users[0]);
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/users/1');
        expect(req.request.method).toEqual('GET');
        req.flush(users[0]);

        httpMock.verify();

    }));


    it('should NOT getUserById', waitForAsync(() => {
        expect(service).toBeTruthy();

        const mockErrorResponse = {status: 400, statusText: 'Bad Request'};

        service.getUserById(1).then((utenteAttuale) => {
            fail('should not get here but did with users: ')
        }, (error) =>{
            expect(error).toBeTruthy();
            expect(error.statusText).toEqual('Bad Request');
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/users/1');
        expect(req.request.method).toEqual('GET');
        req.flush({}, mockErrorResponse);

        httpMock.verify();

    }));


    it('should getCategoryList', waitForAsync(() => {
        expect(service).toBeTruthy();
        const categories = [
            {
              "id": 1,
              "name": "Casa",
              "description": "cose per la casa"
            },
            {
              "id": 2,
              "name": "Borse",
              "description": "Borse e borsoni"
            },
            {
              "id": 3,
              "name": "Sport",
              "description": "Articoli sportivi"
            }
        ];

        service.getCategoryList().then((categorieAttuali) => {
            expect(categorieAttuali).toEqual(categories);
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/category');
        expect(req.request.method).toEqual('GET');
        req.flush(categories);

        httpMock.verify();

    }));


    it('should getCategoryById', waitForAsync(() => {
        const categories = [
            {
              "id": 1,
              "name": "Casa",
              "description": "cose per la casa"
            },
            {
              "id": 2,
              "name": "Borse",
              "description": "Borse e borsoni"
            },
            {
              "id": 3,
              "name": "Sport",
              "description": "Articoli sportivi"
            }
        ]

        service.getCategoryById(1).then((categoriaAttuale) => {
            expect(categoriaAttuale).toEqual(categories[0]);
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/category/1');
        expect(req.request.method).toEqual('GET');
        req.flush(categories[0]);

        httpMock.verify();

    }));

    it('should NOT getCategoryById', waitForAsync(() => {
        expect(service).toBeTruthy();

        const mockErrorResponse = {status: 400, statusText: 'Bad Request'};

        service.getCategoryById(1).then((categoriaAttuale) => {
            fail('should not get here but did with users: ')
        }, (error) =>{
            expect(error).toBeTruthy();
            expect(error.statusText).toEqual('Bad Request');
        });

        const req = httpMock.expectOne('https://dev.frontend.local/api/v1/category/1');
        expect(req.request.method).toEqual('GET');
        req.flush({}, mockErrorResponse);

        httpMock.verify();

    }));

})