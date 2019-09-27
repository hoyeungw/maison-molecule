import { StrX } from 'xbrief'
import { IntX } from '../../../dist/index.esm'

class PipelineOperatorTest {
  static test () {
    const double = (n) => n * 2
    const increment = (n) => n + 1

// without pipeline operator
    double(increment(double(double(5)))) // 42

// with pipeline operator
    const result = 5 |> double |> double |> increment |> double // 42
    StrX.wL(result)
  }

  static testIntX () {
    const num = 5
    const intX = new IntX(3)
    'intX.next(12)'.tag(intX.incre(12)).wL();
    `execute increment on number ${num} twice`
      .tag(5|>intX.incre |>intX.incre).wL()
  }
}

export {
  PipelineOperatorTest
}