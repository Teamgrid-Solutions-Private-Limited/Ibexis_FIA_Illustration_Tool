import * as Yup from 'yup';

const validationSchema = Yup.object({
  AnnAge: Yup.mixed().required("This field is required"),
  AnnFullName: Yup.mixed().required("This field is required"),
  AnnSex: Yup.mixed().required("This field is required"),
  Duration: Yup.mixed().required("This field is required"),
  FloorLimit: Yup.mixed().required("This field is required"),
  InitAmt: Yup.mixed().required("This field is required").test(
    'is-positive',
    "Initial amount must be positive",
    (value) => value > 0
  ),
  PercFixed: Yup.mixed().required("This field is required"),
  PercIndex1: Yup.mixed()
    .required("This field is required"),
  PercIndex2: Yup.mixed().required("This field is required"),
  PercIndex3: Yup.mixed().required("This field is required"),
  PercIndex4: Yup.mixed().required("This field is required"),
  State: Yup.mixed().required("This field is required"),
  SysWD: Yup.mixed().required("This field is required"),
  SysWDMode: Yup.mixed().required("This field is required"),
  SysWDYearEnd: Yup.mixed().required("This field is required"),
  SysWDYearStart: Yup.mixed().required("This field is required"),
});

export default validationSchema;
