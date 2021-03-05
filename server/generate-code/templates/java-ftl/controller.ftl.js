exports.template = (tableEntity, operateConstructor, mapParams) => `
package ${mapParams.packageName}.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.direction.common.result.ResultJson;
import com.direction.spring.mvc.controller.BaseController;
import ${mapParams.packageName}.entity.${tableEntity.upperTableName};
import ${mapParams.packageName}.service.${tableEntity.upperTableName}Service;
import com.direction.spring.mvc.page.VuePage;

/**
* ${tableEntity.tableComment}控制层.
* <pre>
* 	${tableEntity.tableComment}控制层
* </pre>
*
* @mapParams.author ${mapParams.author}
* @since $Rev$
*/

@RestController
@RequestMapping("/${mapParams.requestMapping}")
public class ${tableEntity.upperTableName}Controller extends BaseController {

	// ~ Static Fields
	// ==================================================================================================================

	// ~ Methods
	// ==================================================================================================================
	
	@Autowired
	private ${tableEntity.upperTableName}Service ${tableEntity.lowerTableName}Service;
	
	// ~ Constructors
	// ==================================================================================================================

	// ~ Methods
	// ==================================================================================================================
	
	/**
	 * 分页查询.
	 * 
	 * @param entity
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/list")
	public ResultJson listPage(${tableEntity.upperTableName} ${tableEntity.lowerTableName}, VuePage<${tableEntity.upperTableName}> page) {

		return ResultJson.success(this.${tableEntity.lowerTableName}Service.findPage(${tableEntity.lowerTableName}, page));
	}
	
	/**
	 * 保存信息.
	 * 
	 * @param ${tableEntity.lowerTableName}
	 * @return
	 */
	@RequestMapping(value = "/save")
	public ResultJson save(${tableEntity.upperTableName} ${tableEntity.lowerTableName}) {
	
		this.${tableEntity.lowerTableName}Service.save(${tableEntity.lowerTableName});
		return ResultJson.success(${tableEntity.lowerTableName});
	}
	
	/**
	 * 获取信息.
	 * 
	 * @return
	 */
	@RequestMapping(value = "/get")
	public ResultJson get(String id) {
		return ResultJson.success(this.${tableEntity.lowerTableName}Service.get(id));
	}
	
	/**
	 * 删除.
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public ResultJson delete(String id) {

		if (StringUtils.isBlank(id)) {
			return error("删除失败, 无法获取参数");
		}

		this.${tableEntity.lowerTableName}Service.deleteById(id);

		return success();
	}
}`
