exports.Authorize = async (req, res, next) => {
  try {
    if (req.headers.confirmation === 'allow' || req.headers.confirmation === 'true') {
      next()
    } else {
      res.status(401).json({
        message: 'confirmation header was not found',
        success: false
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'server error',
      success: false
    })
  }
}
