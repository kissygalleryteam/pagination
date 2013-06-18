/**
 * @fileoverview 分页组件，可以定制分页展示的数量 
 * @author aloysious.ld@taobao.com
 * @version 2.0
 *
 */
KISSY.add('gallery/pagination/2.0/index', function(S, Base, EVENT, NODE, DOM){

	"use strict";

	function Pagination(selector, cfg) {
		if (this instanceof Pagination) {
			
			if(S.isObject(selector)){
				this.con = selector;
			}else if(/^#/i.test(selector)){
				this.con = S.one(selector);
			}else if(S.one("#"+selector)){
				this.con = S.one("#"+selector);
			}else if(S.one(selector)){
				this.con = S.one(selector);
			}else {
				throw new Error('Pagination Container Hooker not found');
			}

			Pagination.superclass.constructor.call(this, cfg);
			this.init();
		
		} else {
			return new Pagination(selector, cfg);
		}
	}

	Pagination.ATTRS = {
		// 总页数
		totalPage: {
			value: 10
		},
		// 默认选中的页数
		currentPage: {
			value: 1
		},
		// 当前页的最大紧邻前置页数（不包括最前面的显示页数）
		preposePagesCount: {
			value: 2
		},
		// 当前页的最大紧邻后置页数
		postposePagesCount: {
			value: 1
		},
		// 第一个"..."前显示的页数
		firstPagesCount: {
			value: 2
		},
		// 第二个"..."后显示的页数
		lastPagesCount: {
			value: 0
		},
		render: {
			value: true
		}
	};

	S.extend(Pagination, S.Base, {
		init: function() {
			if (this.get('render')) {
				this.render();
			}
		},
		render: function() {
			this.renderUI();
			this.bindUI();
			this.syncUI();
		},
		renderUI: function() {
			this._resetPagination();	
		},
		bindUI: function() {
			var self = this;
			
			EVENT.delegate(self.con, 'click', '.pagination-spec', function(e) {
				var currTarget = e.currentTarget,
					toPage = parseInt(DOM.attr(currTarget, 'data-page'));
				self._switchToPage(toPage);
			});
			EVENT.delegate(self.con, 'click', '.pagination-prev', function(e) {
				var toPage = self.get('currentPage') - 1;
				self._switchToPage(toPage);
			});
			EVENT.delegate(self.con, 'click', '.pagination-next', function(e) {
				var toPage = self.get('currentPage') + 1;
				self._switchToPage(toPage);
			});
		},
		syncUI: function() {},
		/**
		 * @brief 刷新分页组件
		 */
		_resetPagination: function() {
			var paginationInner = '',
				totalPage = this.get('totalPage') > 0 ? this.get('totalPage') : 1,
				currPage = (this.get('currentPage') <= totalPage && this.get('currentPage')) > 0 ? this.get('currentPage') : 1,
				preposePagesCount = this.get('preposePagesCount') >= 0 ? this.get('preposePagesCount') : 2,
				postposePagesCount = this.get('postposePagesCount') >= 0 ? this.get('postposePagesCount') : 1,
				firstPagesCount = this.get('firstPagesCount') >= 0 ? this.get('firstPagesCount') : 2,
				lastPagesCount = this.get('lastPagesCount') >= 0 ? this.get('lastPagesCount') : 0,
				offset;

			// currPage前的页码展示
			paginationInner += currPage === 1 ? '<span class="pagination-start"><span>上一页</span></span>' : '<a class="pagination-prev"><span>上一页</span></a>';

			if (currPage <= firstPagesCount + preposePagesCount + 1) {
				for(var i=1; i<currPage; i++) {
					paginationInner += this._renderActivePage(i);
				}

			} else {
				for(var i=1; i<=firstPagesCount; i++) {
					paginationInner += this._renderActivePage(i);
				}
				paginationInner += '<span class="pagination-break">...</span>';
				for(var i=currPage-preposePagesCount; i<=currPage-1; i++) {
					paginationInner += this._renderActivePage(i);
				}
			}

			// currPage的页码展示
			paginationInner += '<span class="pagination-curr">' + currPage + '</span>';

			// currPage后的页码展示
			if (currPage >= totalPage - lastPagesCount - postposePagesCount) {
				offset = currPage + 1;
				for(var i=currPage+1; i<=totalPage; i++) {
					paginationInner += this._renderActivePage(i);
				}

			} else {
				for(var i=currPage+1; i<=currPage+postposePagesCount; i++) {
					paginationInner += this._renderActivePage(i);
				}
				paginationInner += '<span class="pagination-break">...</span>';
				for(var i=totalPage-lastPagesCount+1; i<=totalPage; i++) {
					paginationInner += this._renderActivePage(i);
				}
			}

			paginationInner += currPage === totalPage ? '<span class="pagination-end"><span>下一页</span></span>' : '<a class="pagination-next"><span>下一页<span></a>';

			DOM.html(this.con, paginationInner);

		},
	  	/**
	   	 * @brief 渲染可点击的页码
	     * @param index {Number} 页码索引
	     *
	     */
		_renderActivePage: function(index) {
			return '<a class="pagination-spec" data-page="' + index + '">' + index + '</a>';
		},
		_switchToPage: function(page) {
			this.set('currentPage', page);
			this._resetPagination();
			this.fire('switch', {
				toPage: this.get('currentPage')
			});
		},
		show: function() {
			this.con.show();
		},
		hide: function() {
			this.con.hide();
		}
	});

	return Pagination;

},{
	requires:['base', 'event', 'node', 'dom']
});
