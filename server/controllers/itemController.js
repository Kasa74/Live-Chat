const uuid = require('uuid') 
const path = require('path')
const{Item, ItemInfo} = require('../models/models')
const apiError = require('../error/apiError')





class ItemController {
    async create(req,res, next){
        try {
            let {name, price, id, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            
            const item = await Item.create({name, price, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: item.id
                    })
                )
            }


            return res.json(item)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getAll(req,res){
        let {limit, page} = req.query

        limit = limit || 9
        let offset = page * limit - limit
        
        let items = await Item.findAll()
        return res.json(items)
    }

    async getOne(req,res){
        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id},
                include: [{model: ItemInfo, as: 'info'}]
            }
        )
        return res.json(item)
    }
}

module.exports = new ItemController()