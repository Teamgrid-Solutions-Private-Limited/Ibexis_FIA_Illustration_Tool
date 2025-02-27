import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const FormField = ({ id, label, name, type, step, formik, options, req }) => {

  return (
    <div className="mb-3 row formfield">
      <label htmlFor={id} className="form-label col-form-label col-sm-3">
        {label}
        {req ? <div className="tooltip-container">
          <sup
            style={{
              color: formik.errors[name] || formik.values[name]===""|| formik.values[name]==="" ? "red" : "green",
              marginLeft: "5px",
              fontSize: "13px",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
          </sup>

          <span className="tooltip-text">{formik.errors[name]?formik.errors[name]:"This field is required"}</span>
        </div> : null}

      </label>
      <div className="col-sm-9">
        <div className="input-group">
          {type === "select" ? (
            <>
              <select
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
                style={{
                  width: "100%",
                  border: "1px solid rgb(206, 212, 218)",
                  borderRadius: "5px",
                  lineHeight: "2",
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {options?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <MdOutlineKeyboardArrowDown
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#495057',
                  zIndex: 2,
                }}
              />
            </>
          ) : (
            <input
            type={type}
            step={step}
            name={name}
            value={ formik.values[name]} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={`Enter ${label}`}
            className="form-control"
            style={{
              width: "100%",
              border: "1px solid rgb(206, 212, 218)",
              borderRadius: "5px",
              lineHeight: "2",
            }}
          />

          )}
        </div>
        {/* {formik.touched[name] && formik.errors[name] ? (
        <div style={{ marginTop: 5, color: "red" }}>{formik.errors[name]}</div>
      ) : null} */}
      </div>
    </div>
  );
}
export default FormField