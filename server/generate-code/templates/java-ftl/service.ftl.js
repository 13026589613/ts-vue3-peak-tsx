exports.template = (tableEntity, operateConstructor, mapParams) => `
package ${mapParams.packageName}.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.direction.spring.mvc.service.BaseService;
import ${mapParams.packageName}.repository.${tableEntity.upperTableName}Repository;
import ${mapParams.packageName}.entity.${tableEntity.upperTableName};

/**
* ${tableEntity.tableComment}业务逻辑层.
* <pre>
* 	${tableEntity.tableComment}业务逻辑层
* </pre>
*
* @author ${mapParams.author}
* @since $Rev$
*/

@Service
@Transactional(readOnly = true)
public class ${tableEntity.upperTableName}Service extends BaseService<${tableEntity.upperTableName}Repository, ${tableEntity.upperTableName}, String> {

	// ~ Static Fields
	// ==================================================================================================================

	// ~ Methods
	// ==================================================================================================================
}`
