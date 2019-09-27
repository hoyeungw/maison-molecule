import { PipelineOperatorTest } from './tasks/pipelineOperator/PipelineOperatorTest'
import { JsonWithTypeTest } from './tasks/json/JsonWithTypeTest'
import { StrX } from 'xbrief'
import { GP } from 'elprimero'
import { JsonFabTest } from './tasks/json/ObjectShallowCopyTest'

test(PipelineOperatorTest.name, () => {
  PipelineOperatorTest.test()
})

// GP.roughlyNow().tag(JsonWithTypeTest.name |> StrX.jv2py)

test('JsonFabTest', () => {
  JsonFabTest.test()
})

test('JsonWithTypeTest', () => {
  JsonWithTypeTest.test()
})