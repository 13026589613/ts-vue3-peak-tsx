exports.template = (tableEntity, operateConstructor, mapParams) => `
package ${mapParams.packageName}.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import ${mapParams.packageName}.entity.base.Base${tableEntity.upperTableName};

/**
* ${tableEntity.tableComment}层.
* <pre>
* 	${tableEntity.tableComment}业务逻辑层
* </pre>
*
* @mapParams.author ${mapParams.author}
* @since $Rev$
*/

@Entity
@Table(name = "${tableEntity.tableName}")
public class ${tableEntity.upperTableName} extends Base${tableEntity.upperTableName} {

	// ~ Static Fields
	// ==================================================================================================================
	
	private static final long serialVersionUID = 1L;

	// ~ Fields
	// ==================================================================================================================

	// ~ Constructors
	// ==================================================================================================================

	// ~ Methods
	// ==================================================================================================================
}`
