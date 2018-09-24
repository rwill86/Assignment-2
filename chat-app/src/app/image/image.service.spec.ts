import { TestBed, inject } from '@angular/core/testing';
import { ImageService } from './image.service';

describe('ImageService', () => {
     beforeEach(() => {
         TestBed.configureTestingModule({
             providers: [IMageService]
         });
      });

     it('should be created', inject([ImageService], (image: ImageService) => {
         expect(service).toBeTruthy();
     }));
});
