import * as fs from "fs";

export class FileUtils
{
	static doesFileOrDirectoryExist(filePath)
	{
		return fs.existsSync(filePath);
	}

	static writeFile(fileName, buffer)
	{
		return new Promise((resolve, reject) =>
		{
			fs.writeFile(fileName, buffer, (err) =>
			{
				if (err)
				{
					reject(err);
				}
				else
				{
					resolve();
				}
			});
		});
	}
}
