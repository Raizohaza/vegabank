/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import { Button, Card, Row, Space } from "antd";
import { accountInfo } from "slices/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProFormDigit, ProFormText } from "@ant-design/pro-components";
import Form from "antd/es/form/Form";
import LocaleProTable from "components/Locale";
import { useReactive } from "ahooks";
import NapTienForm from "./components/NapTienForm";
import to from "await-to-js";
import { getAccountFindOne } from "services/account";
import { updateAccountInfo } from "slices/accountSlice";
import { customerInfo } from "slices/customerSlice";

function Billing() {
  const dispatch = useDispatch();
  const customer = useSelector(customerInfo);
  const account = useSelector(accountInfo);
  const state = useReactive({
    napTien: {
      visible: false,
    }
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <LocaleProTable>
        {account?.data?.map?.((it, i) => {
          return (
            <Card key={i}>
              <Form initialValues={it}>
                <ProFormText name="accountNumber" label="Account Number" disabled />
                <ProFormText name="type" label="Type" disabled />
                <ProFormDigit name="balance" label="Balance" disabled />
              </Form>
              <Space>
                <Button type="primary" onClick={() => state.napTien.visible = true}>Chuyển khoản nội bộ</Button>
              </Space>
            </Card>
          )
        })}
        <NapTienForm
          state={state.napTien}
          reload={async () => {
            const [, res_2] = await to(getAccountFindOne(customer?.id));
            const accounts = res_2?.data?.data || [];
            dispatch(updateAccountInfo({ data: accounts }));
          }}
        />
      </LocaleProTable>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
