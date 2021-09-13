import { Fragment } from "react";
import Center from "./Center";
import ReactLoading from "react-loading";
import { blue } from "@ant-design/colors";
//
export default function Loader(props) {
  return (
    <Fragment>
      {props.loading ? (
        <Center>
          <ReactLoading
            type={"spinningBubbles"}
            color={blue.primary}
            height={200}
            width={200}
          />
        </Center>
      ) : (
        props.children
      )}
    </Fragment>
  );
}
