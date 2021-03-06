import { moduleNameToCap } from "../utils.js";

export default function _repositoryFileTempalate(name) {
  const capName = moduleNameToCap(name);

  return `import { TransfromError } from "../../helpers/baseError.helper.js";
import ${capName}Model from "./${name}.model.js";

export const findAll${capName} = async () => {
  try {
    const result = await ${capName}Model.find({});
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findAll${capName}", error);
    throw new TransfromError(error);
  }
};

export const find${capName}ById = async id => {
  try {
    const result = await ${capName}Model.findById(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findOne${capName}", error);
    throw new TransfromError(error);
  }
};

export const create${capName} = async data => {
  try {

    const result = await ${capName}Model.create({ ...data });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] create${capName}", error);
    throw new TransfromError(error);
  }
};

export const update${capName} = async (id, data) => {
  try {
    const result = await ${capName}Model.findByIdAndUpdate(id, data);
    return result
  } catch (error) {
    console.error("[EXCEPTION] update${capName}", error);
    throw new TransfromError(error);
  }
};

export const delete${capName}ById = async id => {
  try {
    const result = await ${capName}Model.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] delete${capName}ById", error);
    throw new TransfromError(error);
  }
};

`;
}
