const path = require('path')
const { chmod } = require('shelljs')
const printPrefix = `[hook: afterPack]`

async function linux ({ targets, appOutDir }) {
  if (targets.length !== 1) {
    throw new Error(`${printPrefix} Only one target is allowed at a time for Linux platform`)
  }

  const [{ name: targetName }] = targets
  console.log('target name:', targetName)
  if (['snap', 'yum', 'tar.gz', 'rpm'].includes(targetName.toLowerCase())) {
    chmod(
      '4755', path.join(appOutDir, 'chrome-sandbox')
    )
  }
}

module.exports = exports.default = async (context) => {
  const electronPlatformNameLoweredCase = context.electronPlatformName.toLowerCase()

  if (electronPlatformNameLoweredCase.startsWith('lin')) {
    linux(context)
  }
}
