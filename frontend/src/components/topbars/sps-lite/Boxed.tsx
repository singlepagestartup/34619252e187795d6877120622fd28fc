import { ISpsLiteTopbar } from ".";
import PageBlocks from "~components/page-blocks";

export default function Boxed(props: ISpsLiteTopbar) {
  return (
    <div ref={props.topbarRef} className={props.className || ""}>
      <div className="bg-white w-screen fixed z-40">
        <div className="mx-auto max-w-7xl">
          <PageBlocks
            pageBlocks={props.pageBlocks}
            isLoading={props.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
