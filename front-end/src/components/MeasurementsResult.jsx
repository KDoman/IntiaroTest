import { DivCardMeasurements } from "./DivCardMeasurements";
import { CustomSnippet } from "./CustomSnippet";
import { getConvertInchesToCm } from "../helpers/getConvertInchesToCm";

export function MeasurementsResult({ valueX, valueY, valueZ }) {
  return (
    <div className="row-start-1 row-end-4 col-start-2 mb-10">
      <div className="sticky top-10 ">
        <DivCardMeasurements>
          <p className="mb-3">Result</p>
          <div className="flex flex-col gap-4">
            <CustomSnippet imgVariant={1} width="full">
              {getConvertInchesToCm(valueX)}
            </CustomSnippet>
            <CustomSnippet imgVariant={2} width="full">
              {getConvertInchesToCm(valueY)}
            </CustomSnippet>
            <CustomSnippet imgVariant={3} width="full">
              {getConvertInchesToCm(valueZ)}
            </CustomSnippet>
          </div>
        </DivCardMeasurements>
      </div>
    </div>
  );
}
