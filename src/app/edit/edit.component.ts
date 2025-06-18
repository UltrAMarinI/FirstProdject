import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../shared/enums/urls.enum';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { editServise } from '../../shared/service/services';
import { ApiService } from '../../shared/service/backend.srv';
@Component({
  selector: 'app-edit',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
  providers: [editServise, ApiService],
})
export class EditComponent implements OnInit {
  isEdit = true;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private editService: editServise,
    private ApiService: ApiService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.url[0]?.path==='edit';
    console.log(this.isEdit);
    console.log(this.route.snapshot.url)
    this.form = this.editService.editForm();
  }

  editProduct() {
    console.log(
      'редактирую',
      this.form.get('nameProduct')?.value,
      this.form.get('descriptionProduct')?.value,
      this.form.get('dateProduct')?.value
    );
  }

  createProduct() {
    this.ApiService.postData({
      name:  this.form.get('nameProduct')?.value,
      description:  this.form.get('descriptionProduct')?.value,
      date:  this.form.get('dateProduct')?.value
    }).subscribe(res=>console.log('res', res));
  }

  submit() {
    if (this.isEdit) {
      this.editProduct();
    } else {
      this.createProduct();
    }
    console.log(this.form);
  }

  clearForm() {
    this.editService.clearForm(this.form);
  }
}
