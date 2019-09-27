import { StrX } from 'xbrief'
import { GP } from 'elprimero'

GP.now().wL()
GP.roughlyNow().wL()

// import { TypeCheckSpeedTest } from './tasks/typeCheck/typeCheckSpeed.test'
//
// TypeCheckSpeedTest.inferTypes()

import {DeepCloneTest} from './tasks/copyMethods/deepClone.test'

DeepCloneTest.testLargeMatrices()

// import { IteratePropertiesTest } from './tasks/iterateProperties/iterateProperties.compareShallowCopy'
//
// IteratePropertiesTest.compareShallowCopy()