import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mergePdf, setPdfList } from "./redux/MergeSlice";
import Loader from "../loader/Loader";
import { useFormik } from "formik";
import validationSchema from "./formvalidation/validationSchema";
import FormField from "../FormField";
import { Toast, ToastContainer, Row } from 'react-bootstrap';
const ApiCall = ({ mergePdfs }) => {
  const dispatch = useDispatch();
  const { pdf, status, error } = useSelector((state) => state.mergePdf);
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      AnnAge: "",
      AnnFullName: "",
      AnnSex: "",
      Duration: "",
      FloorLimit: "",
      InitAmt: "",
      PercFixed: "",
      PercIndex1: "",
      PercIndex2: "",
      PercIndex3: "",
      PercIndex4: "",
      ProdAddr1: "",
      ProdAddr2: "",
      ProdAddr3: "",
      ProdCompany: "",
      ProdFullName: "",
      ProdPhone: "",
      State: "",
      SysWD: "",
      SysWDMode: "",
      SysWDYearEnd: "",
      SysWDYearStart: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(mergePdf(values));
    },

  });

  useEffect(() => {
    if (pdf && pdf.pagecounts) {
      const pdfData = Object.keys(pdf).map((key) => {
        if (key.startsWith('ILLUSTRATION_')) {
          const pageCount = getPageCount(key);
          if (pageCount > 0) {
            return {
              PDFUrl: pdf[key].PDFUrl,
              PDFName: pdf[key].PDFName,
              PageCount: pageCount,
            };
          }
        }
        return null;
      }).filter(item => item !== null);

      dispatch(setPdfList(pdfData));
      mergePdfs();
    }
  }, [pdf, dispatch]);

  const getPageCount = (key) => {
    const page = key.replace('ILLUSTRATION_', 'Pages ');
    const pageInfo = pdf.pagecounts.find(p => p.Page === page);
    return pageInfo ? pageInfo.PageCount : 0;
  };

  if (status === 'error') {
    return <div>Error: {error}</div>;
  }
  const handleSubmitForm = () => {
    if (Object.keys(formik.errors).length > 0) {
      setShowToast(true);
    }
    else {
      setShowToast(false);
      formik.handleSubmit();
      formik.resetForm();
    }
  }
  return (<>
    <Row>
        <ToastContainer className="p-3" position="middle-center">
          <Toast
            className="d-inline-block m-1"
            bg="light"
            show={showToast}
            animation={true}
            onClose={() => setShowToast(false)}
          >
            <Toast.Header>
              <strong className="me-auto">Missing Information</strong>
            </Toast.Header>
            <Toast.Body>Please fill up all the required fields!</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>
    <div className="form-row">
      {status === 'loading' && <Loader />}
      <form >
        {/* Jurisdiction Section */}
        <div className="fade alert alert-primary show" style={{ width: "98%" }}>
          Jurisdiction
        </div>
        <FormField
          id="state"
          label="State"
          name="State"
          type="select"
          req={true}
          options={[
            { value: "", label: "Choose..." },
            { value: "AL", label: "Alabama" },
            { value: "AK", label: "Alaska" },
            { value: "AZ", label: "Arizona" },
            { value: "AR", label: "Arkansas" },
            { value: "CA", label: "California" },
            { value: "CO", label: "Colorado" },
            { value: "CT", label: "Connecticut" },
            { value: "DE", label: "Delaware" },
            { value: "DC", label: "District Of Columbia" },
            { value: "FL", label: "Florida" },
            { value: "GA", label: "Georgia" },
            { value: "HI", label: "Hawaii" },
            { value: "ID", label: "Idaho" },
            { value: "IL", label: "Illinois" },
            { value: "IN", label: "Indiana" },
            { value: "IA", label: "Iowa" },
            { value: "KS", label: "Kansas" },
            { value: "KY", label: "Kentucky" },
            { value: "LA", label: "Louisiana" },
            { value: "ME", label: "Maine" },
            { value: "MD", label: "Maryland" },
            { value: "MA", label: "Massachusetts" },
            { value: "MI", label: "Michigan" },
            { value: "MN", label: "Minnesota" },
            { value: "MS", label: "Mississippi" },
            { value: "MO", label: "Missouri" },
            { value: "MT", label: "Montana" },
            { value: "NE", label: "Nebraska" },
            { value: "NV", label: "Nevada" },
            { value: "NH", label: "New Hampshire" },
            { value: "NJ", label: "New Jersey" },
            { value: "NM", label: "New Mexico" },
            { value: "NY", label: "New York" },
            { value: "NC", label: "North Carolina" },
            { value: "ND", label: "North Dakota" },
            { value: "OH", label: "Ohio" },
            { value: "OK", label: "Oklahoma" },
            { value: "OR", label: "Oregon" },
            { value: "PA", label: "Pennsylvania" },
            { value: "RI", label: "Rhode Island" },
            { value: "SC", label: "South Carolina" },
            { value: "SD", label: "South Dakota" },
            { value: "TN", label: "Tennessee" },
            { value: "TX", label: "Texas" },
            { value: "UT", label: "Utah" },
            { value: "VT", label: "Vermont" },
            { value: "VA", label: "Virginia" },
            { value: "WA", label: "Washington" },
            { value: "WV", label: "West Virginia" },
            { value: "WI", label: "Wisconsin" },
            { value: "WY", label: "Wyoming" },
          ]}
          formik={formik}
        />

        {/* Annuitant Information */}
        <div className="fade alert alert-primary show" style={{ width: "98%" }}>
          Annuitant Information
        </div>
        <FormField id="fullname" label="Full Name" name="AnnFullName" type="text" formik={formik} req={true} />
        <FormField id="age" label="Age" name="AnnAge" type="number" formik={formik} req={true} />
        <FormField id="gender" label="Gender" name="AnnSex" type="select" formik={formik} req={true} options={[
          { value: "", label: "Choose..." },
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ]} />

        {/* Contract Specifications */}
        <div className="fade alert alert-primary show" style={{ width: "98%" }}>
          Contract Specifications
        </div>
        <FormField id="duration" label="Duration" name="Duration" type="select" req={true} options={[
          { value: "", label: "Choose..." },
          { value: "5", label: "5" },
          { value: "7", label: "7" },
          { value: "10", label: "10" },
        ]} formik={formik} />
        <FormField id="floorlimit" label="Floor Limit" type="number" step="0.01" name="FloorLimit" formik={formik} req={true} />
        <FormField id="initamt" label="Initial Amount" name="InitAmt" type="number" formik={formik} req={true} />
        <FormField id="percfixed" label="Percentage Fixed" name="PercFixed" type="number" step="0.01" formik={formik} req={true} />
        <FormField id="percindex1" label="Percentage Index 1" name="PercIndex1" type="number" step="0.01" formik={formik} req={true} />
        <FormField id="percindex2" label="Percentage Index 2" name="PercIndex2" type="number" step="0.01" formik={formik} req={true} />
        <FormField id="percindex3" label="Percentage Index 3" name="PercIndex3" type="number" step="0.01" formik={formik} req={true} />
        <FormField id="percindex4" label="Percentage Index 4" type="number" step="0.01" name="PercIndex4" formik={formik} req={true} />

        {/* Withdrawals */}
        <div className="fade alert alert-primary show" style={{ width: "98%" }}>
          Withdrawals
        </div>
        <FormField id="syswd" label="SysWD" type="number" name="SysWD" formik={formik} req={true} />
        <FormField id="syswdmode" label="SysWDMode" type="select" name="SysWDMode" formik={formik} req={true} options={[
          { value: "", label: "Choose..." },
          { value: "Annual", label: "Annual" },
          { value: "Semiannual", label: "Semiannual" },
          { value: "Monthly", label: "Monthly" },
          { value: "Quarterly", label: "Quarterly" },
        ]} />
        <FormField id="syswdyearend" label="SysWDYearEnd" type="number" name="SysWDYearEnd" formik={formik} req={true} />
        <FormField id="syswdyearstart" label="SysWDYearStart" type="number" name="SysWDYearStart" formik={formik} req={true} />

        {/* Producer Information */}
        <div className="fade alert alert-primary show" style={{ width: "98%" }}>
          Producer Information
        </div>
        <FormField label="Full Name" name="ProdFullName" id="ProdFullName" type="text" formik={formik} req={false} />
        <FormField label="Company" name="ProdCompany" id="ProdCompany" type="text" formik={formik} req={false} />
        <FormField label="Phone" name="ProdPhone" id="ProdPhone" type="text" formik={formik} req={false} />
        <FormField label="Address 1" name="ProdAddr1" id="ProdAddr1" type="text" formik={formik} req={false} />
        <FormField label="Address 2" name="ProdAddr2" id="ProdAddr2" type="text" formik={formik} req={false} />
        <FormField label="Address 3" name="ProdAddr3" id="ProdAddr3" type="text" formik={formik} req={false} />

        <button type="button" onClick={handleSubmitForm} className="btn btn-primary btn2">Submit</button>
      </form>


    </div>
  </>

  );
};

export default ApiCall;
