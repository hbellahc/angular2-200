import { Subject } from 'rxjs/Subject';
import { MockBackend } from '@angular/http/testing';
import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
// @todo(wassim): there is a weird behavior with mock responses
// they return Promises instead of the actual 'expectedResponse' object.
describe('PeopleService', () => {
  const expectedResponse = [{
    'id': '123',
    'lastname': 'Powers',
    'firstname': 'Black',
    'twitter': 'labore',
  }, {
    'id': '456',
    'lastname': 'Shaffer',
    'firstname': 'Vargas',
    'twitter': 'irure',
  }, {
    'id': '789',
    'lastname': 'Yang',
    'firstname': 'Mendez',
    'twitter': 'excepteur',
  }];

  const responseOptions = (body, status = 200) => {
    return new ResponseOptions({
      status,
      body: JSON.stringify(body)
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        PeopleService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('fetch()', () => {

    it('should fetch all people when status === 200', inject([PeopleService, XHRBackend], (_service, _mockbackend) => {

      _mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(
          new ResponseOptions(responseOptions(expectedResponse))
        ));
      });

      _service.fetch().subscribe(response => {
        // TODO
      });

    }));

    it('should fetch empty array when status !== 200', inject([PeopleService, XHRBackend], (_service, _mockbackend) => {

      _mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(
          new ResponseOptions(responseOptions(expectedResponse, 404))
        ));
      });

      _service.fetch().subscribe(response => {
        // TODO
      });

    }));
  });

  describe('fetchRandom()', () => {

    it('should fetch random person when status === 200', inject([PeopleService, XHRBackend], (_service, _mockbackend) => {

      _mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(
          new ResponseOptions(responseOptions(expectedResponse[1]))
        ));
      });

      _service.fetchRandom().subscribe(person => {
        // TODO
      });

    }));

  });

  describe('fetchOne()', () => {

    it('should fetch person with id=456 when status === 200', inject([PeopleService, XHRBackend], (_service, _mockbackend) => {

      _mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(
          new ResponseOptions(responseOptions(expectedResponse[1]))
        ));
      });

      _service.fetchOne('456').subscribe(person => {
        // TODO
      });

    }));

  });

  describe('delete()', () => {

    it('should delete person with id=456 when status === 200', inject([PeopleService, XHRBackend], (_service, _mockbackend) => {

      _mockbackend.connections.subscribe(connection => {
        const _expectedResponse = Array.from(expectedResponse);
        _expectedResponse.splice(1, 1); // remove entry=1

        connection.mockRespond(new Response(
          new ResponseOptions(responseOptions(_expectedResponse))
        ));
      });

      _service.delete('456').subscribe(response => {
        // TODO
      });

    }));

  });

  describe('update()', () => {

    it('should update person with id=456 when status === 200', inject([PeopleService, XHRBackend], (_service, _mockbackend) => {

      const body = expectedResponse[1];
      body.firstname = 'Wassim';
      body.lastname = 'Chegham';
      body.twitter = '@manekinekko';

      _mockbackend.connections.subscribe(connection => {
        expectedResponse[1].firstname = 'Wassim';
        expectedResponse[1].lastname = 'Chegham';
        expectedResponse[1].twitter = '@manekinekko';

        connection.mockRespond(new Response(
          new ResponseOptions(responseOptions(expectedResponse[1]))
        ));
      });

      _service.update(body).subscribe(person => {
        // TODO
      });

    }));

  });

  describe('create()', () => {

    it('should create person when status === 200', inject([PeopleService, XHRBackend], (_service, _mockbackend) => {
      // TODO (POST request returns created person in HTTP response)
    }));

  });

});
