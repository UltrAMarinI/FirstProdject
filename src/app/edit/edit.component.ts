import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../shared/enums/urls.enum';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../shared/interfaces/product.interface';
import { editServise } from '../../shared/service/services';
@Component({
  selector: 'app-edit',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
  providers: [editServise],
})
export class EditComponent implements OnInit {
  isEdit = true;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private editService: editServise
  ) {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  ngOnInit(): void {
    let url = this.route.snapshot.url.join('/');
    this.isEdit = url === Urls.Edit ? true : false;
    console.log(this.isEdit);

    this.form = this.editService.editForm();
  }

  editProduct() {
    console.log(
      'редактирую',
      this.form.get('nameProduct')?.value,
      this.form.get('priceProduct')?.value
    );
  }

  createProduct() {
    console.log(
      'создаю',
      this.form.get('nameProduct')?.value,
      this.form.get('priceProduct')?.value
    );
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
