import { createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

// Create and export the mapper
export const mapper = createMapper({
  strategyInitializer: pojos()
})
