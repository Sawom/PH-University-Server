const createStudent = async (req: Request, res: Response) => {
  try {

    // create a schema validation using joi/zod e same line likha lage
    const student = req.body.student; // student data zeta student object hoye zabe

    // // data validate using joi
    // const {error, value} = studentValidationSchema.validate(student)


    // data validate using zod
    // const zodParsedData = studentValidationZodSchema.parse(student)

    // will call service function to send this data
    const result = await StudentService.createStudentIntoDB(zodParsedData);

    // send response with a message
    res.status(200).json({
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      // simple message update. instance method user exists
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};