import { Component } from '@angular/core';

@Component({
  selector: 'novel-list',
  templateUrl: './novel-list.component.html',
  styleUrls: ['./novel-list.component.css']
})
export class NovelListComponent {
  novels = [{'id': 2,
    'name': 'Test Novel',
    'description': 'Description of test novel',
    'scenes': [],
    'image': '/assets/image.jpg',
    'createDateTime': '2018-06-05T14:40:25',
    'updateDateTime': '2018-06-05T14:40:25'},
  {'id': 3, 'name': 'Test Novel 2',
    'description': 'Description of test novel 2',
    'scenes': [],
    'image': '/assets/image.jpg',
    'createDateTime': '2018-06-05T14:40:25',
    'updateDateTime': '2018-06-05T14:40:25'}];
}
