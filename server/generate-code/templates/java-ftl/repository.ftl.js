exports.template = (tableEntity, operateConstructor, mapParams) => `
package ${mapParams.packageName}.repository;

import org.springframework.stereotype.Repository;

import com.direction.spring.mvc.repository.BaseRepository;
import ${mapParams.packageName}.entity.${tableEntity.upperTableName};

/**
* ${tableEntity.tableComment}数据层.
* <pre>
* 	${tableEntity.tableComment}数据层
* </pre>
*
* @mapParams.author ${mapParams.author}
* @since $Rev$
*/

@Repository
public interface ${tableEntity.upperTableName}Repository extends BaseRepository<${tableEntity.upperTableName}, String> {

	// ~ Static Fields
	// ==================================================================================================================

	// ~ Methods
	// ==================================================================================================================
}`
