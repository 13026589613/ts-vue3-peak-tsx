const utils = require('../../common/utils')
exports.template = (tableEntity, operateConstructor, mapParams) => `
package ${mapParams.packageName}.entity.base;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

${initImportSource(operateConstructor)}
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.direction.spring.mvc.entity.BaseEntity;

/**
* ${tableEntity.tableComment}实体类.
* <pre>
* 	${tableEntity.tableComment}实体类
* </pre>
*
* @mapParams.author ${mapParams.author}
* @since $Rev$
*/

@MappedSuperclass
@EntityListeners({
  AuditingEntityListener.class
})
public class Base${tableEntity.upperTableName} extends BaseEntity {

	// ~ Static Fields
	// ==================================================================================================================
	
	private static final long serialVersionUID = 1L;

	// ~ Fields
  // ==================================================================================================================
  ${initBeanEntity(tableEntity, operateConstructor)}
	
	// ~ Constructors
	// ==================================================================================================================

	// ~ Methods
	// ==================================================================================================================
  ${initBeanReflexMethods(operateConstructor)}
}`

/**
 * @description 遍历解析生产getter 、setter方法 反射部分
 */
function initBeanReflexMethods(operateConstructor) {
  let renderColumns = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map(column => {
    renderColumns += `
    public ${column.attrType} get${column.upperColumnName}() {
    	return ${column.lowerColumnName};
    }\n
    public void set${column.upperColumnName}(${column.attrType} ${column.lowerColumnName}) {
    	this.${column.lowerColumnName} = ${column.lowerColumnName};
    }\n`
  })
  return `${renderColumns}`
}

// 头部 important 文件源
function initImportSource(operateConstructor) {
  let renderColumns = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map(column => {
    if (column.columnName === 'create_by') {
      renderColumns += `\nimport org.springframework.data.annotation.CreatedBy;`
    }
    if (column.columnName === 'update_by') {
      renderColumns += `\nimport org.springframework.data.annotation.LastModifiedBy;`
    }
    if (column.columnName === 'create_date') {
      renderColumns += `\nimport org.springframework.data.annotation.CreatedDate;`
    }
    if (column.columnName === 'update_date') {
      renderColumns += `\nimport org.springframework.data.annotation.LastModifiedDate;`
    }

    if (column.dataType === 'Boolean') {
      renderColumns += `\nimport org.hibernate.annotations.Type;`
    }
  })
  return renderColumns
}

/**
 * @description 根据 columns 对象 遍历解析生产实体 bean 对象 注解部分
 */
function initBeanEntity(tableEntity, operateConstructor) {
  let renderColumns = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map(column => {
    renderColumns += `
    // ${column.columnComment}
    `
    if (column.columnKey == 'PRI' || column.columnKey == 'pri') {
      renderColumns += `
      @Id
      @GeneratedValue(generator = "${tableEntity.tableName}_pk")
      @GenericGenerator(name = "${tableEntity.tableName}_pk", strategy = "uuid")
      @Column(name = "${column.columnName}", unique = true, nullable = false);
      `
    } else if (
      column.columnName === 'create_by' ||
      column.columnName === 'update_by' ||
      column.columnName === 'create_date' ||
      column.columnName === 'update_date'
    ) {
      if (column.columnName === 'create_by') {
        renderColumns += `@CreatedBy`
      }
      if (column.columnName === 'update_by') {
        renderColumns += `@CreatedBy`
      }
      if (column.columnName === 'create_date') {
        renderColumns += `@CreatedBy`
      }
      if (column.columnName === 'update_date') {
        renderColumns += `@CreatedBy`
      }
      renderColumns += `@Column(name = "${column.columnName}")`
    } else if (column.dataType === 'char') {
      renderColumns += `@Column(name = "${column.columnName}", columnDefinition = "char")`
    } else if (column.dataType === 'Boolean') {
      renderColumns += `@Type(type = "true_false")`
      renderColumns += `@Column(name = "${column.columnName}")`
    } else {
      renderColumns += `@Column(name = "${column.columnName}")`
    }

    if (column.dataType === 'Date') {
      renderColumns += `@JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")`
      renderColumns += `private LocalDateTime ${field.lowerColumnName};`
    } else {
      renderColumns += `
    private ${column.attrType} ${column.lowerColumnName};
    `
    }
  })
  return `${renderColumns}`
}
