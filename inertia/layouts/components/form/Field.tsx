import { FormInstance } from "antd";
import _ from "lodash";
import { NamePath } from "antd/es/form/interface";
import { ReactNode, useMemo } from "react";
import useFormValue from "../../hooks/useFormValue";

interface FieldProps<Values> {
  children: (_form: FormInstance<Values>) => ReactNode;
  form: FormInstance<Values>;
  dependencies?: NamePath<Values>[];
}

const Field = <Values extends object>(props: Readonly<FieldProps<Values>>) => {
  const { children, form, dependencies } = props;
  const { getValues } = useFormValue<Values>(form);

  const formValues = _.map(dependencies, (item) => getValues(item));

  return useMemo(() => {
    return children(form);
  }, formValues ?? []);
};

export default Field;
