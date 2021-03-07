import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../modules/gateway-api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<ProfileFormComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) {
    this.form = fb.group({
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.form.get('gender').setValue(this.user.gender);
  }

  public get Genders(): string[] {
    return [null, 'Male', 'Female', 'Custom'];
  }

  formSubmitted() {
    this.dialogRef.close(this.form.value);
  }
}
