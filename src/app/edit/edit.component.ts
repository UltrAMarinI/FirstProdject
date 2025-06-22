import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { editServise } from '../../shared/service/services';
import { ApiService } from '../../shared/service/backend.srv';
@Component({
  selector: 'app-edit',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
  providers: [editServise, ApiService],
})
export class EditComponent implements OnInit {
  isEdit = true;
  form!: FormGroup;
  idParam: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private editService: editServise,
    private ApiService: ApiService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.url[0]?.path === 'edit';
    this.form = this.editService.editForm();

    this.route.paramMap.subscribe((params) => {
      this.idParam = params.get('id');
      if (this.idParam) {
        this.editProductId();
      }
    });
  }

  editProductId() {
    this.ApiService.getOne(this.idParam).subscribe((a) => {
      this.form.get('nameProduct')?.setValue(a.name);
      this.form.get('descriptionProduct')?.setValue(a.description);
      this.form.get('dateProduct')?.setValue(a.date);
    });
  }

  editProduct() {
    this.ApiService.putData({
      id: Number(this.idParam),
      name: this.form.get('nameProduct')?.value,
      description: this.form.get('descriptionProduct')?.value,
      date: this.form.get('dateProduct')?.value,
    }).subscribe(() => {});
  }

  createProduct() {
    this.ApiService.postData({
      name: this.form.get('nameProduct')?.value,
      description: this.form.get('descriptionProduct')?.value,
      date: this.form.get('dateProduct')?.value,
    }).subscribe(() => {});
  }

  submit() {
    if (this.isEdit) {
      this.editProduct();
    } else {
      this.createProduct();
    }
  }

  clearForm() {
    this.editService.clearForm(this.form);
  }
}
